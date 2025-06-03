import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">
            Bem-vindo ao InvestPro
          </CardTitle>
          <CardDescription>
            Esta é a tela inicial da sua nova aplicação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Utilize o menu lateral para navegar entre as seções de Clientes e
            Ativos. Esta aplicação foi desenhada com um estilo minimalista para
            focar na funcionalidade e facilidade de uso.
          </p>
          <div className="rounded-lg overflow-hidden border">
            <Image
              src="https://placehold.co/800x400.png"
              alt="Placeholder Image"
              width={800}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint="office workspace"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
