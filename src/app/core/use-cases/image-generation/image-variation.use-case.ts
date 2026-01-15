import { environment } from 'environments/environment.development';

export const imageVariationUseCase = async (originalImage: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/image-variation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ baseImage: originalImage }),
    });

    if (!resp.ok) throw new Error('Cannot create image');

    const { url, revisedPrompt: alt } = await resp.json();

    return { url, alt };
  } catch (error) {
    console.log(error);
    return null;
  }
};
