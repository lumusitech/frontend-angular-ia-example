import { environment } from 'environments/environment.development';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!resp.ok) throw new Error('Cannot create audio');

    const audioBlob = await resp.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return { ok: true, message: prompt, audioUrl };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Cannot create audio',
      audioUrl: '',
    };
  }
};
