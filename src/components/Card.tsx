import Image from "next/image";

export default function Card({ title, tags, date }: { title: string, tags: string[], date: string }) {
  return (
    <div className='p-4 rounded-md border border-slate-200 bg-slate-900 text-white duration-200 transition-all'>
      <div className='flex'>
        {tags.map((tag: string) => (
          <Image
            key={tag}
            src={`/img/svg/${tag}.svg`}
            width={20}
            height={20}
            alt={title}
            className='mr-2'
          />
        ))}
      </div>
      <div>
        <h2 className='text-sm mt-2 mb-1 h-10 overflow-y-hidden'>{title}</h2>
        <span className='text-xs'>{date}</span>
      </div>
    </div>
  );
}
