import Logo from '../src/logoivaa.svg'

export const Navbar = () => {
    return (

    <nav className='flex justify-between border border-b divide-purple-100'>
      <div className='flex items-center w-[25%] p-4 bg-purple-100'>
        <h1 className='flex-1 text-xl font-bold ml-4 '>Rumah IVAA</h1>
      </div>
      <div className='flex items-center p-4 mr-4'><Logo/></div>
    </nav>
   
    );
};
