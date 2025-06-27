document.addEventListener('DOMContentLoaded', () => {

    const textToTranslateEl = document.getElementById("text-to-translate");
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedTextEl = document.getElementById('translated-text');
    const statusMessageEl = document.getElementById('status-message');

    const backendApiUrl = 'http://openai102dothiago.azurewebsites.net/api/translate';
    async function translateText() {

        const textToTranslate = textToTranslateEl.value;
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value;

        // Verificação simples para garantir que o usuário digitou algo.
        if (!textToTranslate) {
            alert("Por favor, digite um texto para traduzir.");
            return; // Para a execução da função aqui.
        }

        // Informa ao usuário que a tradução está em andamento.
        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = ''; // Limpa o campo de resultado anterior.

        const response = await fetch(backendApiUrl, { // <-- Usa a URL do nosso backend
            method: 'POST',
            headers: {
                // <-- Cabeçalhos de autenticação REMOVIDOS
                'Content-type': 'application/json'
            },
            // <-- O corpo agora usa o formato que NOSSA API espera
            body: JSON.stringify({
                'text': textToTranslate,
                'to': toLanguage,
                'from': fromLanguage
            })
        });
            
            // (Dentro da função translateText, dentro do bloco try)

            // A API respondeu. Agora, convertemos a resposta para um objeto JavaScript.
            const data = await response.json();

            // Se a resposta da API contém um erro (ex: chave inválida), nós o mostramos.

        // Verificamos o status da resposta diretamente
        if (!response.ok) {
            throw new Error(data.error || 'Ocorreu um erro no servidor.');
        }

        try{
        
            // Acessamos a tradução de forma muito mais direta
            const translation = data.translation;
            
            // Colocamos o texto traduzido no <textarea> de resultado.
            translatedTextEl.value = translation;
            statusMessageEl.textContent = 'Tradução concluída!'; // Sucesso!

        } catch (error) {
            console.error("Ocorreu um erro:", error);
            statusMessageEl.textContent = `Erro na tradução: ${error.message}`;
        }
    }

    translateBtn.addEventListener('click', translateText);
    
})