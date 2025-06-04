import { Dropdown } from '@mui/base/Dropdown';
import React, { useState } from 'react';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { Menu, MenuItem } from '../dropdown/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface CalendarDayOptionProps {
  id: number;
  deletePost: (id: number) => void;
}

export default function CalendarDayOption({
  id,
  deletePost,
}: CalendarDayOptionProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className='float-right'>
      <Dropdown
        onOpenChange={(e, open) => setDropdownOpen(open)}
        open={dropdownOpen}
        defaultOpen={false}
        // disableScrollLock={true}
      >
        <BaseMenuButton>
          <FontAwesomeIcon icon={faEllipsisVertical} color='black' />
        </BaseMenuButton>
        <Menu className='z-50'>
          <MenuItem
            onClick={() => {
              deletePost(id);
              setDropdownOpen(true);
            }}
          >
            Eliminar agendamento
            {/* {t('home.posts.schedule-post')} */}
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
}
