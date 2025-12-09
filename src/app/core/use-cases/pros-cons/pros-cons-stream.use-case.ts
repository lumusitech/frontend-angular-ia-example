import { environment } from 'environments/environment.development';

//? Generator function that returns a stream of text: AsyncGenerator<string, string | null, unknown>
export async function* prosConsStreamUseCase(prompt: string, abortSignal: AbortSignal) {
  try {
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusses-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal,
    });

    if (!resp.ok) throw new Error('No se puedo realizar la comparación');

    const reader = resp.body?.getReader();

    if (!reader) {
      console.log('No se puedo leer el stream');
      throw new Error('No se puedo leer el stream');
    }

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    }

    return text;
  } catch (error) {
    return null;
  }
}
