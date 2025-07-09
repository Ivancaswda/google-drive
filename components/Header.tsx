import React from "react";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const Header = ({
  userId,
  accountId,
    user
}: {
  userId: string;
  accountId: string;
  user: any
}) => {
  return (
      <header className="header">
          <Search/>
          <div className="header-wrapper flex items-center gap-4">
              <FileUploader ownerId={userId} accountId={accountId}/>

              {/* Аватар пользователя */}
              <div className="flex items-center gap-2">
                  {user?.image ? (
                      <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={36}
                          height={36}
                          className="rounded-full border border-gray-300"
                      />
                  ) : (

                      <DropdownMenu>
                          <DropdownMenuTrigger>
                              <div
                                  className="size-9 cursor-pointer rounded-full bg-gray-200 text-center text-sm font-semibold leading-9 text-gray-700">
                                  {user?.name?.charAt(0).toUpperCase() || "U"}
                              </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>


                              {Number(user.storageLimit) !== 2 * 1024 ** 3 &&
                                  <DropdownMenuItem><Link href='/billing'>Расширение хранилища</Link></DropdownMenuItem>}

                              <DropdownMenuSeparator/>
                              <DropdownMenuItem>
                                  <Link href='/team'> Команда google drive</Link></DropdownMenuItem>
                               <DropdownMenuItem onClick={async () => {
                                   "use server";
                                   await signOutUser();
                               }}>Выйти</DropdownMenuItem>
                      </DropdownMenuContent>
                      </DropdownMenu>
                  )}
              </div>


          </div>
      </header>
  );
};
export default Header;
