import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { DataTable, TableActions } from "../../../shared/components/DataTable";
import FormModal from "../../../shared/components/FormModal";
import { useUsers } from "../hooks/useUsers";
import type { AdminUser } from "../../../shared/types/admin.types";

function getInitials(fullName: string) {
  const names = fullName.trim().split(" ");
  if (names.length === 0) return "?";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

function UsersPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const { data, isLoading } = useUsers();
  const users = data?.data ?? [];

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter((user) => {
      return (
        user.full_name.toLowerCase().includes(search) ||
        user.phone.toLowerCase().includes(search) ||
        (user.address ?? "").toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search)
      );
    });
  }, [search, users]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const columns: ColumnsType<AdminUser> = [
    {
      title: "Sıra",
      key: "index",
      width: 70,
      render: (_value, _record, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: "Avatar",
      dataIndex: "img_url",
      key: "img_url",
      width: 100,
      render: (img_url: string | null, record) => (
        <div className="flex items-center justify-center">
          {img_url ? (
            <img
              src={img_url}
              alt={record.full_name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
              {getInitials(record.full_name)}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Ad Soyad",
      dataIndex: "full_name",
      key: "full_name",
      render: (full_name: string) => (
        <span className="font-semibold">{full_name}</span>
      ),
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => <span className="text-gray-600">{phone}</span>,
    },
    {
      title: "Ünvan",
      dataIndex: "address",
      key: "address",
      render: (address: string | null) => (
        <span className="text-gray-500">{address ?? "Qeyd olunmayıb"}</span>
      ),
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      width: 140,
      render: (role: AdminUser["role"]) => (
        <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {role}
        </span>
      ),
    },
    {
      title: "Əməliyyat",
      key: "actions",
      width: 120,
      render: (_value, record) => (
        <TableActions onView={() => setSelectedUser(record)} />
      ),
    },
  ];

  function handleCloseDetails() {
    setSelectedUser(null);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">İstifadəçilər</h1>
      </div>

      <DataTable<AdminUser>
        columns={columns}
        dataSource={paginatedUsers}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={filteredUsers.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <FormModal
        open={Boolean(selectedUser)}
        title="İstifadəçi məlumatları"
        onClose={handleCloseDetails}
        onSubmit={handleCloseDetails}
        submitText="Bağla"
      >
        {selectedUser ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Ad Soyad</p>
              <p className="font-medium text-gray-900">
                {selectedUser.full_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefon</p>
              <p className="font-medium text-gray-900">{selectedUser.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ünvan</p>
              <p className="font-medium text-gray-900">
                {selectedUser.address ?? "Qeyd olunmayıb"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rol</p>
              <p className="font-medium text-gray-900">{selectedUser.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Yaradılma tarixi</p>
              <p className="font-medium text-gray-900">
                {new Date(selectedUser.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : null}
      </FormModal>
    </div>
  );
}

export default UsersPage;
