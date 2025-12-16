"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconLayoutColumns,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { UserWithRole } from "better-auth/plugins/admin";
import { useState, useMemo } from "react";
import { UserRowActions } from "./user-row";

interface UsersTableProps {
  users: UserWithRole[];
  selfId: string;
}

export function UsersTable({ users, selfId }: UsersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [columnVisibility, setColumnVisibility] = useState({
    user: true,
    role: true,
    created: true,
    actions: true,
  });

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, pageIndex, pageSize]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < totalPages - 1;

  function getInitials(name: string | null, email: string): string {
    if (name) {
      const parts = name.split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    }
    return email.slice(0, 2).toUpperCase();
  }

  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <IconUsers className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Users</h1>
            <p className="text-sm text-muted-foreground">
              Manage users and their permissions
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPageIndex(0);
            }}
            className="pl-9"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns className="size-4" />
              <span className="hidden sm:inline">Columns</span>
              <IconChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuCheckboxItem
              checked={columnVisibility.user}
              onCheckedChange={(checked) =>
                setColumnVisibility((prev) => ({ ...prev, user: checked }))
              }
            >
              User
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={columnVisibility.role}
              onCheckedChange={(checked) =>
                setColumnVisibility((prev) => ({ ...prev, role: checked }))
              }
            >
              Role
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={columnVisibility.created}
              onCheckedChange={(checked) =>
                setColumnVisibility((prev) => ({ ...prev, created: checked }))
              }
            >
              Created
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={columnVisibility.actions}
              onCheckedChange={(checked) =>
                setColumnVisibility((prev) => ({ ...prev, actions: checked }))
              }
            >
              Actions
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {columnVisibility.user && <TableHead>User</TableHead>}
              {columnVisibility.role && <TableHead>Role</TableHead>}
              {columnVisibility.created && <TableHead>Created</TableHead>}
              {columnVisibility.actions && (
                <TableHead className="w-[80px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  {searchQuery ? "No users found." : "No users available."}
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => {
                const isSelf = user.id === selfId;
                return (
                  <TableRow key={user.id}>
                    {columnVisibility.user && (
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarImage src={user.image || undefined} />
                            <AvatarFallback>
                              {getInitials(user.name, user.email)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {user.name || "No name"}
                              </span>
                              {isSelf && (
                                <Badge
                                  variant="primary"
                                  size="xs"
                                  appearance="light"
                                >
                                  You
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {user.email}
                            </span>
                            <div className="flex items-center gap-1.5 mt-1">
                              {user.banned && (
                                <Badge
                                  variant="destructive"
                                  size="xs"
                                  appearance="light"
                                >
                                  Banned
                                </Badge>
                              )}
                              {!user.emailVerified && (
                                <Badge
                                  variant="warning"
                                  size="xs"
                                  appearance="light"
                                >
                                  Unverified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    )}
                    {columnVisibility.role && (
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "admin" ? "primary" : "secondary"
                          }
                          appearance="light"
                          size="sm"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                    )}
                    {columnVisibility.created && (
                      <TableCell className="text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </TableCell>
                    )}
                    {columnVisibility.actions && (
                      <TableCell>
                        {!isSelf && <UserRowActions user={user} />}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground hidden sm:block">
          Showing {paginatedUsers.length} of {filteredUsers.length} user(s)
        </div>
        <div className="flex items-center gap-6 sm:gap-8 ml-auto">
          <div className="hidden items-center gap-2 sm:flex">
            <Label htmlFor="rows-per-page" className="text-sm">
              Rows per page
            </Label>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="w-20" size="sm" id="rows-per-page">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm">
            Page {pageIndex + 1} of {totalPages || 1}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 sm:flex"
              onClick={() => setPageIndex(0)}
              disabled={!canPreviousPage}
            >
              <span className="sr-only">First page</span>
              <IconChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPageIndex((i) => i - 1)}
              disabled={!canPreviousPage}
            >
              <span className="sr-only">Previous page</span>
              <IconChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPageIndex((i) => i + 1)}
              disabled={!canNextPage}
            >
              <span className="sr-only">Next page</span>
              <IconChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 sm:flex"
              onClick={() => setPageIndex(totalPages - 1)}
              disabled={!canNextPage}
            >
              <span className="sr-only">Last page</span>
              <IconChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
