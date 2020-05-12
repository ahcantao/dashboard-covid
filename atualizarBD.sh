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


tempDir="#";
sshAuth="#";

echo -e "${Blue}[!] Executando script de atualização...${NC}"

ssh -t $sshAuth "sudo bash /local/scrip" || exit_on_error "Opa... Falha ao rodar script"

echo -e "${Blue}[!] Saindo... Tchau!${NC}"
