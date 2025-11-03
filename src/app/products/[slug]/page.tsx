/**
 * @fileoverview Product Detail Page
 * Clean architecture implementation of product detail page
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlugUseCase } from "@/core/usecases/product/getProductBySlug";
import { ProductGallery } from "@/features/product";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import ContainerPage from "@/container/ContainerPage";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProductBySlugUseCase.execute(slug);

    return {
      title: `${product.name} - ${product.brand || "Lumina Storefront"}`,
      description:
        product.description || `Shop ${product.name} at the best price`,
      openGraph: {
        title: product.name,
        description:
          product.description || `Shop ${product.name} at the best price`,
        images: product.image ? [{ url: product.image }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found - Lumina Storefront",
      description: "The requested product could not be found",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlugUseCase.execute(slug);
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }

  // Prepare gallery images
  const galleryImages = [
    product.image,
    ...product.variants.map((variant) => variant.imageUrl),
  ].filter(Boolean);

  // Prepare breadcrumb items
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  // Add category breadcrumbs
  if (product.category && product.category.length > 0) {
    const mainCategory = product.category[0];
    breadcrumbItems.push({
      href: `/category/${mainCategory.slug}`,
      label: mainCategory.name,
    });
  }

  return (
    <ContainerPage>
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={item.href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Gallery */}
        <div className="order-1">
          <ProductGallery images={galleryImages} productName={product.name} />
        </div>

        {/* Product Details */}
        <div className="order-2">
          {/* <ProductDetails product={product} /> */}
        </div>
      </div>
    </ContainerPage>
  );
}
