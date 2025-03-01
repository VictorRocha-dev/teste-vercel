import { NextResponse } from "next/server";

const fakeDatabase = [
  {
    id: "1",
    titulo: "Apartamento Luxuoso no Centro",
    descricao: "Apartamento espaçoso, ótima localização e vista incrível.",
    imagem: "/images/api-fake-image1.jpeg",
  },
  {
    id: "2",
    titulo: "Casa Moderna com Piscina",
    descricao: "Casa aconchegante, ideal para famílias.",
    imagem: "/images/api-fake-image2.jpeg",
  },
  {
    id: "3",
    titulo: "Cobertura Exclusiva",
    descricao: "Cobertura sofisticada com vista para a cidade.",
    imagem: "/images/api-fake-image3.jpeg",
  },
];

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const property = fakeDatabase.find((item) => item.id === id);

  if (!property) {
    return NextResponse.json(
      { error: "Imóvel não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(property);
}
