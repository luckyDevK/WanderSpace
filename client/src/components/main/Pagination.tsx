import { buttonVariants } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

import { usePlacesContext } from '@/context/usePlaceContext';

export default function PaginationTabs() {
  const {
    page: currentPage,
    totalPages,
    handleNavigate,
    handleNext,
    handlePrevious,
  } = usePlacesContext();

  const totalPagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem onClick={handlePrevious}>
            <PaginationPrevious
              onClick={handlePrevious}
              href="#"
              className={`border`}
            />
          </PaginationItem>

          {totalPagesArr.map((page) => {
            // Show first, last, current, current±1
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <PaginationItem
                  aria-label={`page-${page}`}
                  onClick={() => handleNavigate(page)}
                  key={page}
                >
                  <PaginationLink
                    href={`#${page}`}
                    isActive={page === currentPage}
                    className={cn({
                      [buttonVariants({
                        variant: 'default',
                        className:
                          'hover:!text-primary-foreground !shadow-none',
                      })]: page === currentPage,
                      border: page !== currentPage,
                    })}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            // Add ellipsis if it's the first hidden page after 1 or before last
            if (
              (page === currentPage - 2 && page > 2) ||
              (page === currentPage + 2 && page < totalPages - 1)
            ) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return null;
          })}

          <PaginationItem onClick={handleNext}>
            <PaginationNext href="#" className={`border`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
