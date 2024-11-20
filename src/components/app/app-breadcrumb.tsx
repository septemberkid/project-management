'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React, { Fragment } from 'react';
import { useBreadcrumb } from '@/contexts/breadcrumb-context';

const AppBreadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => {
          return (
            <Fragment key={item.title}>
              {index != breadcrumbs.length - 1 ? (
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbPage className={'font-semibold'}>
                  {item.title}
                </BreadcrumbPage>
              )}

              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator className='hidden md:block' />
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default AppBreadcrumb;
