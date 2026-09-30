export async function getFromDB() {
  await new Promise((resolve)=>setTimeout(resolve,2000)); // 2 seconds delay 
  return "from DB";
}
interface getProps{
  children:React.ReactNode;
}
export async function getFromChildern({children}:getProps) {
  await new Promise((resolve)=>setTimeout(resolve,2000)); // 2 seconds delay 
  return (
    <>
    {/* start */}
    {children}
    {/* test */}
    </>
  );
}