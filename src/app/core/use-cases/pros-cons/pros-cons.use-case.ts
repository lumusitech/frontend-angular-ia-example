import type { OrthographyResponse } from '@interfaces/orthography.response';
import { ProsConsResponse } from '@interfaces/pros-cons.response';
import { environment } from 'environments/environment.development';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) throw new Error('No se puedo realizar la comparación');

    const data = (await resp.json()) as ProsConsResponse;

    return { ...data, ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      role: '',
      content: 'Error al intentar realizar la comparación',
    };
  }
};
