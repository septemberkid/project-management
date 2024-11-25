import { Roles } from '@/enums';
import { capitalize } from '@/libs/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseAsString, useQueryStates } from 'nuqs';
import ComboBox, { Option } from '@/components/combo-box';

export const useMemberFilters = () => {
  return useQueryStates({
    name: parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
    }),
    email: parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
    }),
    base_role: parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
    }),
    trashed: parseAsString.withDefault('0').withOptions({
      clearOnDefault: true,
    }),
  });
};

interface MemberFiltersProps {
  onFilter?: () => void;
  onReset?: () => void;
}
const MemberFilters = ({ onFilter, onReset }: MemberFiltersProps) => {
  const [{ name, email, base_role, trashed }, setFilters] = useMemberFilters();

  const onResetHandler = async () => {
    await setFilters({
      name: '',
      email: '',
      base_role: '',
      trashed: '0',
    });
    onReset?.();
  };
  const onFilterHandler = async () => {
    onFilter?.();
  };
  const roles: Option[] = Object.entries(Roles).map(([key, value]) => ({
    value: value,
    label: capitalize(key),
  }));
  const dataToShowOptions: Option[] = [
    {
      label: 'Trashed Only',
      value: '1',
    },
    {
      label: 'Without Trashed',
      value: '0',
    },
  ];
  return (
    <div className='flex w-full flex-col gap-2 lg:flex-row'>
      <Input
        placeholder={'Name'}
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
        placeholder={'Email'}
        type={'text'}
        value={email}
        className={'lg:w-fit'}
        onChange={v =>
          setFilters({
            email: v.target.value,
          })
        }
      />
      <ComboBox
        className={'lg:w-fit'}
        value={base_role}
        options={roles}
        placeholder={'Select role'}
        onChange={async value => {
          await setFilters({
            base_role: value,
          });
        }}
      />
      <ComboBox
        className={'lg:w-fit'}
        value={trashed}
        options={dataToShowOptions}
        placeholder={'Select data to show'}
        onChange={async value => {
          await setFilters({
            trashed: value,
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
export default MemberFilters;
