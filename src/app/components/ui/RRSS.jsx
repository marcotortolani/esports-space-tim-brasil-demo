import {
  FacebookIcon,
  XtwitterIcon,
  YoutubeIcon,
  InstagramIcon,
} from '@/utils/icons'
import Link from 'next/link'

const RRSSData = [
  {
    urlSite: 'https://twitter.com/esports_space',
    account: '@esports_space',
    icon: <XtwitterIcon w={24} fill="#fff" />,
  },
  {
    urlSite: 'https://www.facebook.com/esports.space/',
    account: '@esports.space',
    icon: <FacebookIcon w={24} fill="#fff" />,
  },
  {
    urlSite: 'https://www.instagram.com/esports_space/',
    account: '@esports_space',
    icon: <InstagramIcon w={24} fill="#fff" />,
  },
  {
    urlSite: 'https://www.youtube.com/@esports_space',
    account: '@esports_space',
    icon: <YoutubeIcon w={24} fill="#fff" />,
  },
]

export default function RRSS() {
  return (
    <>
      {RRSSData.map((item, index) => (
        <RRSSItem key={index} href={item.urlSite} account={item.account}>
          {item.icon}
        </RRSSItem>
      ))}
    </>
  )
}

function RRSSItem({ href, account, children }) {
  return (
    <Link href={href} className="z-10 relative group font-poppins">
      <div className=" z-10 scale-100 group-hover:scale-115 transition-all duration-200 ease-in-out">
        {children}
      </div>
      <span className=" -z-20 absolute top-0 translate-y-[0%] left-0 -translate-x-[150%] px-4 py-0.5 bg-white/50 backdrop-blur-md text-black opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-200 ease-in-out rounded-full ">
        {account}
      </span>
    </Link>
  )
}
