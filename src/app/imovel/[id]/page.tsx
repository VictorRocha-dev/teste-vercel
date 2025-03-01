import { Metadata } from "next";
import Image from "next/image";

// 🏗️ Função para gerar metadados dinâmicos (SEO)
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/imoveis/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Erro ao buscar imóvel");
    }

    const property = await res.json();

    return {
      title: `${property.titulo} - ${property.localizacao} | AcheLar`,
      description: property.descricao,
      openGraph: {
        title: `${property.titulo} - ${property.localizacao}`,
        description: property.descricao,
        url: `https://www.seusite.com.br/imovel/${id}`,
        images: [
          {
            url: property.imagem,
            width: 1200,
            height: 630,
            alt: property.titulo,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${property.titulo} - ${property.localizacao}`,
        description: property.descricao,
        images: [property.imagem],
      },
    };
  } catch (error) {
    console.error("Erro ao buscar metadados do imóvel:", error);

    return {
      title: "Imóvel não encontrado | AcheLar",
      description: "Detalhes do imóvel não disponíveis no momento.",
    };
  }
}

// 🏠 Página dinâmica do imóvel
export default async function ImovelPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/imoveis/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Erro ao buscar imóvel");
    }

    const property = await res.json();

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">{property.titulo}</h1>
        <p className="text-gray-600">{property.descricao}</p>
        <Image
          src={property.imagem}
          alt="Imagem do imóvel"
          width={600}
          height={400}
          className="mt-4 block max-w-lg rounded-lg shadow-lg"
        />

        {/* 🔥 JSON-LD para SEO (Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Apartment",
              name: property.titulo,
              description: property.descricao,
              image: `https://www.seusite.com.br${property.imagem}`,
              url: `https://www.seusite.com.br/imovel/${id}`,
              address: {
                "@type": "PostalAddress",
                addressLocality: property.localizacao,
                addressCountry: "BR",
              },
              offers: {
                "@type": "Offer",
                price: property.preco || "Sob consulta",
                priceCurrency: "BRL",
              },
            }),
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar imóvel:", error);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Imóvel não encontrado</h1>
        <p className="text-gray-600">
          Não foi possível carregar os detalhes do imóvel.
        </p>
      </div>
    );
  }
}
