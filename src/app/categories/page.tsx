import CustomBreadcrumb from "@/components/breadcrumbs/CustomBreadcrumb";
import ContainerPage from "@/container/ContainerPage";
import WrapperSection from "@/sections/WrapperSection";
import { fetchCategories } from "@/services/api/categories/getCategories"; // Pastikan path ini benar
import { Category } from "@/types/categories";
import Link from "next/link";

const CategoriesPage = async () => {
  const categories: Category[] = (await fetchCategories({
    level: "0",
  })) as Category[];

  const breadcrumbItems = [
    { href: "/", label: "Beranda" },
    {
      href: "/categories",
      label: "Category",
      isCurrent: true,
    },
  ];

  return (
    <ContainerPage>
      <CustomBreadcrumb items={breadcrumbItems} />

      <WrapperSection title="Jelajahi kategori">
        {categories.length === 0 ? (
          <p className="text-muted-foreground">
            Tidak ada kategori yang tersedia saat ini.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <div key={category._id} className="flex flex-col">
                {/* Kategori Utama */}
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  <Link
                    href={`/c1/${category.slug}`}
                    className="hover:text-custom-blue transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </h2>
                {category.description && (
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                    {category.description}
                  </p>
                )}

                {/* Daftar Koleksi (Sub-Kategori) */}
                {category.collections && category.collections.length > 0 && (
                  <ul className="space-y-1">
                    {category.collections.map((collection) => (
                      <li key={collection._id} className="pl-4">
                        {" "}
                        {/* Padding lebih dalam */}
                        <Link
                          href={`/c2/${collection.slug}`} // Contoh link untuk koleksi
                          className="text-sm text-muted-foreground hover:text-custom-blue transition-colors duration-200"
                        >
                          {collection.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </WrapperSection>
    </ContainerPage>
  );
};

export default CategoriesPage;
