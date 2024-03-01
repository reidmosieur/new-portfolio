import { Fragment, ReactNode, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Actions } from '@/components/button/types/types';
import Button from '@/components/button';
import ModalContainer from '../modalContainer';

interface SimpleModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: any;
  title: ReactNode;
  icon?: ReactNode;
  actions?: Actions[];
}

export default function SimpleModal({
  children,
  open,
  setOpen,
  title,
  icon,
  actions,
}: SimpleModalProps) {
  const cancelButtonRef = useRef(null)

  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
    >
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          {icon &&
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  {icon}
              </div>
          }
          <div className="container">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
              {title}
            </Dialog.Title>
            {children}
          </div>
        </div>
      </div>
      {actions &&
        <div className="bg-gray-50 px-4 py-3 flex flex-row flex-nowrap gap-2 sm:flex-row-reverse sm:px-6">
            {actions.map((action, index) => (
                <Button key={action.content} {...action} />
            ))}
        </div>
      }
    </ModalContainer>
  )
}
