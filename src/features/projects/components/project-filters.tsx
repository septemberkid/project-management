import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseAsString, useQueryStates } from 'nuqs';
import ComboBoxServer from '@/components/combo-box-server';
import { useState } from 'react';
import { useGetClientsOptions } from '@/features/clients/apis/use-get-clients-options';

export const useProjectFilters = () => {
  return useQueryStates({
    name: parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
    }),
    clientId: parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
    }),
  });
};

interface ProjectFiltersProps {
  onFilter?: () => void;
  onReset?: () => void;
}
const ProjectFilters = ({ onFilter, onReset }: ProjectFiltersProps) => {
  const [{ name, clientId }, setFilters] = useProjectFilters();
  const [keyword, setKeyword] = useState('');
  const {
    data: options,
    isLoading,
    isFetching,
  } = useGetClientsOptions(keyword, clientId);

  const onResetHandler = async () => {
    await setFilters({
      name: '',
      clientId: '',
    });
    onReset?.();
  };
  const onFilterHandler = async () => {
    onFilter?.();
  };
  return (
    <div className='flex w-full flex-col gap-2 lg:flex-row'>
      <Input
        placeholder={'Project name'}
        type={'text'}
        value={name}
        className={'lg:w-fit'}
        onChange={v =>
          setFilters({
            name: v.target.value,
          })
        }
      />
      <ComboBoxServer
        className={'lg:w-fit'}
        value={clientId}
        options={options}
        isLoading={isLoading || isFetching}
        onChangeKeyword={setKeyword}
        placeholder={'Select client'}
        onChange={async value => {
          await setFilters({
            clientId: value,
          });
        }}
      />
      <Button variant={'outline'} onClick={onResetHandler}>
        Reset Filter
      </Button>
      <Button variant={'outline'} onClick={onFilterHandler}>
        Filter
      </Button>
    </div>
  );
};
export default ProjectFilters;
