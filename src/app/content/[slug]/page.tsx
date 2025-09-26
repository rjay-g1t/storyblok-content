import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ClientButtons } from '@/utils/button-event-handler';

// temp interface - idk what the types are yet
interface ContentData {
  id: string;
  title: string;
  content: string;
  metaDescription?: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  aiMetadata?: {
    generatedAt: string;
    contentHash: string;
    processingVersion: string;
  };
}

interface ContentPageProps {
  params: {
    slug: string;
  };
}

async function getContentBySlug(slug: string): Promise<ContentData | null> {
  // mock data for demo
  const mockContent: Record<string, ContentData> = {
    'introduction-to-ai-content-automation': {
      id: 'test-1',
      title: 'Introduction to AI Content Automation',
      content: `# Welcome to AI Content Automation

        This is a sample content page created dynamically using Next.js 14 App Router.

        ## Key Features

        - **Dynamic routing** with \`/content/[id]\` pattern
        - **Server-side rendering** for optimal SEO
        - **Type-safe** content handling
        - **Responsive design** with Tailwind CSS

        ## How it Works

        1. User uploads a file
        2. System processes the content
        3. Generates a unique ID
        4. Creates this dynamic page automatically

        ## Content Details

        This content was processed and made available through our AI content automation system. The page adapts to any content structure while maintaining consistent styling and SEO optimization.

        ### Technical Implementation

        The page uses Next.js 14's App Router with:
        - Server Components for optimal performance
        - Dynamic metadata generation
        - Responsive layout with Tailwind CSS
        - Type-safe content rendering

        ---

        *This is a demonstration of dynamic content creation.*`,
      metaDescription:
        'Learn about AI content automation and how dynamic pages are created automatically from uploaded files.',
      category: 'tutorials',
      tags: [
        'ai',
        'automation',
        'content',
        'I',
        'Hope',
        'Pass',
        'This',
        'Test',
      ],
      publishedAt: new Date().toISOString(),
      aiMetadata: {
        generatedAt: new Date().toISOString(),
        contentHash: 'abc123def456',
        processingVersion: '1.0.0',
      },
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 100));

  return mockContent[slug] || null;
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { slug } = params;

  try {
    // fetch content dynamically based on slug
    const content = await getContentBySlug(slug);

    if (!content) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <header className="px-8 py-6 border-b border-gray-200">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {content.title}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-4">
                <time
                  dateTime={content.publishedAt}
                  className="flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {new Date(content.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>

                {content.category && (
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="capitalize">{content.category}</span>
                  </span>
                )}

                <span className="flex items-center text-blue-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  ID: {content.id}
                </span>
              </div>

              {content.tags && content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="px-8 py-6">
              <div className="prose prose-lg max-w-none">
                <ContentRenderer content={content.content} />
              </div>
            </div>

            <footer className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 gap-4">
                <div className="flex items-center space-x-4">
                  <span>
                    Content ID:{' '}
                    <code className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">
                      {content.id}
                    </code>
                  </span>
                  {content.aiMetadata && (
                    <span>
                      Generated:{' '}
                      {new Date(
                        content.aiMetadata.generatedAt
                      ).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-medium">
                    ✓ AI Generated
                  </span>
                  {content.aiMetadata && (
                    <span className="text-xs text-gray-400">
                      v{content.aiMetadata.processingVersion}
                    </span>
                  )}
                </div>
              </div>
            </footer>
          </article>
          <ClientButtons
            buttons={[
              {
                id: 'back-to-list',
                label: 'Back to Content',
                action: { type: 'navigate', path: '/content' },
                variant: 'ghost',
                size: 'md',
              },
              {
                id: 'edit',
                label: 'Edit',
                action: { type: 'navigate', path: `/content/${slug}/edit` },
                variant: 'primary',
                size: 'md',
              },
            ]}
            layout="horizontal"
            alignment="between"
            maxWidth="4xl"
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading content:', error);
    notFound();
  }
}

function ContentRenderer({ content }: { content: string }) {
  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return (
            <h1
              key={index}
              className="text-3xl font-bold mt-8 mb-4 text-gray-900"
            >
              {line.substring(2)}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="text-2xl font-semibold mt-6 mb-3 text-gray-800"
            >
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3
              key={index}
              className="text-xl font-medium mt-4 mb-2 text-gray-800"
            >
              {line.substring(4)}
            </h3>
          );
        }

        // handle bold text
        if (line.startsWith('- **') && line.includes('**')) {
          const boldMatch = line.match(/- \*\*(.*?)\*\*(.*)/);
          if (boldMatch) {
            return (
              <li key={index} className="mb-2">
                <strong className="text-gray-900">{boldMatch[1]}</strong>
                <span className="text-gray-700">{boldMatch[2]}</span>
              </li>
            );
          }
        }

        // handle list items
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="mb-1 text-gray-700">
              {line.substring(2)}
            </li>
          );
        }

        // handle numbered lists
        if (/^\d+\./.test(line)) {
          return (
            <li key={index} className="mb-1 text-gray-700 list-decimal">
              {line.replace(/^\d+\.\s*/, '')}
            </li>
          );
        }

        if (line.trim() === '---') {
          return <hr key={index} className="my-8 border-gray-300" />;
        }

        if (line.trim() === '') {
          return <br key={index} />;
        }

        if (
          line.trim() &&
          !line.startsWith('#') &&
          !line.startsWith('-') &&
          !line.startsWith('*')
        ) {
          return (
            <p key={index} className="mb-4 text-gray-800 leading-relaxed">
              {line}
            </p>
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  return <div className="content-body">{formatContent(content)}</div>;
}

// generate metadata dynamically for SEO
export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const content = await getContentBySlug(slug);

    if (!content) {
      return {
        title: 'Content Not Found',
        description: 'The requested content could not be found.',
      };
    }

    return {
      title: `${content.title} | AI Content Hub`,
      description:
        content.metaDescription ||
        `Read ${content.title} - AI generated content.`,
      keywords: content.tags?.join(', '),
      openGraph: {
        title: content.title,
        description: content.metaDescription || content.title,
        type: 'article',
        publishedTime: content.publishedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: content.title,
        description: content.metaDescription || content.title,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Content Not Found',
      description: 'The requested content could not be found.',
    };
  }
}
