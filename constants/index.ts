export const navItems = [
  {
    name: "Мой диск",
    icon: "/assets/icons/dashboard.svg",
    url: "/",
  },

  {
    name: "Недавние",
    icon: "/assets/icons/images.svg",
    url: "/recent",
  },
  {
    name: "Помеченные",
    icon: "/assets/icons/video.svg",
    url: "/starred",
  },
  {
    name: "Корзина",
    icon: "/assets/icons/others.svg",
    url: "/busket",
  },
  {
    name: "Хранилище",
    icon: "/assets/icons/others.svg",
    url: "/cloud",
  },
];

export const actionsDropdownItems = [
  {
    label: "Переименовать",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Иноформация",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Поделиться",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Скачать",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Удалить",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
  {
    label: "Пометить",
    icon: "/assets/icons/star-icon.png",
    value: "star",
  },
];

export const sortTypes = [
  {
    label: "По дате создания (новейшие)",
    value: "$createdAt-desc",
  },
  {
    label: "По дате создания (старые)",
    value: "$createdAt-asc",
  },
  {
    label: "Название (А-Я)",
    value: "name-asc",
  },
  {
    label: "Название (Я-A)",
    value: "name-desc",
  },
  {
    label: "Размер (Больше)",
    value: "size-desc",
  },
  {
    label: "Размер (Меньше)",
    value: "size-asc",
  },
];

export const avatarPlaceholderUrl =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
