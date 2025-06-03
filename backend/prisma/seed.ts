import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.asset.createMany({
    data: [
      { nome: "Ação XPTO", tipo: "Ação", valor: 150.0 },
      { nome: "Fundo Imobiliário ABC", tipo: "Fundo", valor: 300.0 },
      { nome: "Tesouro Direto", tipo: "Renda Fixa", valor: 200.0 },
      { nome: "ETF BOVA11", tipo: "ETF", valor: 120.0 },
      { nome: "Debênture XP", tipo: "Renda Fixa", valor: 500.0 },
    ],
  });
  console.log("Assets de exemplo inseridos!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
