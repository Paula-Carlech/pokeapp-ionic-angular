# Guia de Instalação do Projeto

Este guia explica como configurar e executar o projeto localmente.

---

## Pré-requisitos

Certifique-se de ter instalado as seguintes ferramentas:

- **Node.js** (versão 14 ou superior)  
  Download: [https://nodejs.org](https://nodejs.org)

- **npm** (vem com o Node.js)  
  Verifique a versão:  

  ```bash
  npm -v

- **Ionic CLI** (se estiver usando Ionic)
  Instale globalmente se ainda não tiver:

  ```bash
  npm install -g @ionic/cli

## Passos de Instalação

1. Clone o repositório

  ```bash
git clone https://github.com/SeuUsuario/SeuProjeto.git
cd SeuProjeto

2. Instale as dependências
Execute o script de instalação ou instale manualmente:

  ```bash
# Opção 1: Execute o script (Linux/macOS)
./install.sh

# Opção 2: Execute o script (Windows)
install.bat

# Opção 3: Instalação manual
npm install

```

3. Execute o projeto

  ```bash
ionic serve

4. Acesse no navegador
Normalmente em [http://localhost:8100](http://localhost:8100)

## Observações Importantes
Se não tiver permissão para executar install.sh:

  ```bash
chmod +x install.sh
./install.sh
```

- Para Windows, basta clicar duas vezes no arquivo install.bat ou executá-lo no Prompt de Comando.

**Se encontrar problemas:**

- Verifique as versões do Node.js e npm

- Confirme que o Ionic CLI está instalado globalmente

- Consulte a documentação oficial para soluções
