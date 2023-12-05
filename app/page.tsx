import Image from 'next/image'

export default function Home() {
  return (
    <div className='container mx-auto '>
      <div className='navbar bg-base-100'>
        <a className='btn btn-ghost text-xl'>Spa</a>
      </div>
      <div className='container mx-auto flex justify-center'>
        <div className='card card-compact w-96 bg-base-100 shadow-xl'>
          <figure>
            <Image src='https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' alt='Shoes' />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className='card-actions justify-end'>
              <button className='btn btn-primary'>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
