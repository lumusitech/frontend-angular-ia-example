import type { TranslateResponse } from '@interfaces/index';
import { environment } from 'environments/environment.development';

export const translateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) throw new Error('No se puedo realizar la traducción');

    const { message } = (await resp.json()) as TranslateResponse;

    return { message, ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al intentar realizar la traducción',
    };
  }
};
