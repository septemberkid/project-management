import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseAsString, useQueryStates } from 'nuqs';

export const useClientFilters = () => {
  return useQueryStates({
    name: parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
    }),
    address: parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
    }),
  });
};

interface ClientFiltersProps {
  onFilter?: () => void;
  onReset?: () => void;
}
const ClientFilters = ({ onFilter, onReset }: ClientFiltersProps) => {
  const [{ name, address }, setFilters] = useClientFilters();

  const onResetHandler = async () => {
    await setFilters({
      name: '',
      address: '',
    });
    onReset?.();
  };
  const onFilterHandler = async () => {
    onFilter?.();
  };
  return (
    <div className='flex w-full flex-col gap-2 lg:flex-row'>
      <Input
        placeholder={'Client name'}
        type={'text'}
        value={name}
        className={'lg:w-fit'}
        onChange={v =>
          setFilters({
            name: v.target.value,
          })
        }
      />
      <Input
        placeholder={'Client address'}
        type={'text'}
        value={address}
        className={'lg:w-fit'}
        onChange={v =>
          setFilters({
            address: v.target.value,
          })
        }
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
export default ClientFilters;
