# Naylor-Telegram:

## ✨ Funcionalidades

* **Sistema de Comandos Modular:** Carrega comandos automaticamente de pastas específicas, permitindo adicionar novas funcionalidades facilmente.
* **Manipulação de Mensagens:** Processa mensagens recebidas e executa comandos baseados no prefixo `/`.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

* **Node.js**: Versão 16.x ou superior.
* **npm** : Gerenciador de pacotes.
* **npm install**: use antes de iniciar o script. 
---

## 📦 Instalação

Siga os passos abaixo para configurar o projeto:

1.  **Clone o repositório** (ou copie o código para um novo arquivo `index.js`):

    ```bash
    git clone <url_do_seu_repositorio>
    cd <nome_da_pasta>
    ```

    Se você copiou o código, crie um arquivo chamado `index.js` e cole o conteúdo fornecido.


## 🚀 Como Usar

### 1. Estrutura de Pastas

O bot espera que seus comandos estejam organizados em uma pasta chamada `Commands` na raiz do projeto. Dentro de `Commands`, você pode criar subpastas para organizar seus comandos (por exemplo, `Commands/Admin`, `Commands/Util`).

A estrutura deve ser similar a esta:

```
.
├── index.js
└── Commands/
    ├── Categoria1/
    │   └── meucomando.js
    └── Categoria2/
        └── outrocomando.js
```

### 2. Criando um Comando

Cada arquivo de comando (`.js`) deve exportar um objeto com as propriedades `data` e `execute`.

* `data`: Um objeto contendo o `name` do comando (que será usado após o `/` para invocar o comando).
* `execute`: Uma função assíncrona que será executada quando o comando for chamado. Ela recebe os seguintes argumentos:
    * `client`: O objeto de conexão, usado para enviar mensagens, etc.
    * `message`: O objeto da mensagem recebida.
    * `messageType`: O tipo de conteúdo da mensagem (ex: 'conversation', 'imageMessage').
    * `sender`: funçao de envio.

**Exemplo de comando (`Commands/Util/ping.js`):**

```javascript
module.exports = {
    data: {
        name: 'ping',
    },
    async execute(client, message, sender) {
        await client.sendMessage(sender, 
            {
              message: `Pong ${message.senderId}`
            }
        );
    },
};
```

Neste exemplo, ao digitar `/ping` no Telegram, o bot responderá com "Pong!".

### 3. Rodando o Bot

Para iniciar o bot, execute o seguinte comando no terminal na raiz do projeto:

```bash
node index.js
```

---

## 🤝 Primeira Conexão

Na primeira vez que você rodar o bot:

1.  Um **String: Code** será exibido no seu terminal.
2.  Ele sera usado para conexão;

---

## 🚨 Resolução de Problemas

* **`[AVISO] O comando em ... está faltando "data" ou "execute"`**: Certifique-se de que seus arquivos de comando (`.js`) exportam um objeto com as propriedades `data` (com o nome do comando) e `execute` (a função do comando).
* **`[AVISO] Pasta de comandos não encontrada. Ignorando sistema de comandos.`**: Verifique se a pasta `Commands` existe na raiz do seu projeto.
* **Erro de conexão/QR Code não aparece**:
    * Verifique sua conexão com a internet.
    * Certifique-se de que as dependências foram instaladas corretamente (`npm install`).

---

## ❓ Precisa de ajuda?

Se tiver dúvidas ou encontrar problemas, sinta-se à vontade para abrir uma *issue* no repositório (se for um projeto Git) ou revisar a documentação oficial do GramJs: `https://painor.gitbook.io/gramjs`.