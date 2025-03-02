import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            이 공간은 미래 혁신을 위한 빈 캔버스입니다. 상상력을 자극할 흥미로운 기능들로 가득 찰
            준비를 하세요! 업데이트를 계속 지켜봐 주세요!
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {/* Todo : 프로젝트 리스트 데이터 연결 */}
            {/* {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))} */}
            아직 첫 페이지를 쓰지 않았습니다. 하지만 곧 흥미진진한 이야기가 시작될 거예요.
          </div>
        </div>
      </div>
    </>
  )
}
