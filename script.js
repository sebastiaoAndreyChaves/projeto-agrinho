document.addEventListener('DOMContentLoaded', () => {
  // Elementos DOM
  const lengthInput = document.getElementById('lengthInput');
  const generateBtn = document.getElementById('generateBtn');
  const passwordDisplay = document.getElementById('passwordDisplay');
  const copyBtn = document.getElementById('copyBtn');

  // Caracteres permitidos para a senha
  const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';

  // Função para retornar um caractere aleatório da string passada
  function randomChar(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
  }

  // Gera a senha com o comprimento solicitado
  function generatePassword(length) {
    const passwordArray = [];

    // Preenche o array com caracteres aleatórios
    for (let i = 0; i < length; i++) {
      passwordArray.push(randomChar(allChars));
    }

    // Embaralha para evitar padrão previsível (Fisher-Yates)
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join('');
  }

  // Evento de clique no botão "Gerar Senha"
  generateBtn.addEventListener('click', () => {
    let length = parseInt(lengthInput.value, 10);

    // Validação mínima do comprimento da senha
    if (isNaN(length) || length < 8) {
      length = 16;
      lengthInput.value = length;
    }

    // Gera e mostra a senha
    const password = generatePassword(length);
    passwordDisplay.textContent = password;

    // Exibe o botão copiar
    copyBtn.style.display = 'inline-block';
  });

  // Evento para copiar a senha para a área de transferência
  copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.textContent;

    if (!password || password === 'Clique em gerar para criar a senha') return;

    navigator.clipboard.writeText(password).then(() => {
      copyBtn.textContent = 'Copiado!';
      setTimeout(() => {
        copyBtn.textContent = 'Copiar Senha';
      }, 2000);
    }).catch(() => {
      alert('Falha ao copiar. Tente copiar manualmente.');
    });
  });
});

