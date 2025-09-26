// this will handle interactions with the Storyblok API

export class StoryblokService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'https://api.storyblok.com/v1';
  }

  async getStory(slug: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/stories/${slug}`, {
      headers: {
        Authorization: 'Bearer your_api_token',
      },
    });
    return response.json();
  }
}

export const storyblokService = new StoryblokService();
