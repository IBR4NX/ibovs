import wait from "@/utils/wait"
import Logo from "@/ibovs/logo"
 async function Page(){
  await wait(3000);
  return (
    <>
    <div className="container">
    <Logo size={60} />
      <div className="card">Hover me</div>
    <div className="h-[00px] pt-8 bg-aber-100 g" 
    >
  
    
    <a href="#t" id="top"> end d</a>
    </div>
    <div id="end"> 
    <a href="#top" >top</a>
       </div>
      </div>
    </>
  )
}

export default Page