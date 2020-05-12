#!/bin/sh

# Regular Colors
Black='\033[0;30m'        # Black
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan
White='\033[0;37m'        # White
NC='\033[0m' # No Color


# pasta do dashboard
tempDir="#";

#root@ip
sshAuth="#";


echo -e "${Blue}[!] Entrando na pasta ${tempDir}...${NC}"

cd $tempDir;

echo -e "${Blue}[!] Criando versão para produção e zipando... ${NC}"

ng build --prod --aot && cd dist; zip -r ../dist.zip * || exit_on_error "Opa... Falha ao buildar ou zipar";

echo -e "${Blue}[!] Subindo dist.zip no servidor ${sshAuth}...${NC}"

scp $tempDir/dist.zip $sshAuth:/endereco/no/server || exit_on_error "Opa... Falha ao subir arquivo";

echo -e "${Blue}[!] Executando script de atualização...${NC}"

ssh -t $sshAuth "sudo bash /script/no/server" || exit_on_error "Opa... Falha ao rodar script"

echo -e "${Blue}[!] Saindo... Tchau!${NC}"
