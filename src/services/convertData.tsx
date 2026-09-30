export default function convertData(d: object) {
  const fields = ["name", "email","bio", "staus"];
  const fieldsStatic = ["slug","status","bio", "createdAt", "updatedAt", "role"];
  // ترجمة المفاتيح
  const labels: Record<string, string> = {
    name: "الاسم",
    email: "البريد",
    status: "الحالة",
    role: "الدور",
    createdAt: "تاريخ الانشاء",
    updatedAt: "اخر تحديث ",
    slug:"المعرف الفريد",
    bio:"الوصف"
  };
  if(!d)return null 
  const dataEntries = Object.entries(d)
    .filter(([key]) => fields.includes(key)) // اختار الحقول المطلوبة فقط
    .map(([key, value]) => ({
      name: labels[key] || key,
      key: key,
      value
    }));
  const data = Object.entries(d)
    .filter(([key]) => fieldsStatic.includes(key)) // اختار الحقول المطلوبة فقط
    .map(([key, value]) => ({
      name: labels[key] || key,
      key: key,
      value
    }));
  console.log(dataEntries);
  return { data, edit: dataEntries,...d };
}