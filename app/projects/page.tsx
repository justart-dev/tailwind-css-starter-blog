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
            여기에는 다양한 프로젝트가 공유 될 예정입니다.
          </p>
        </div>
        <div className="container py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              아직 게시된 프로젝트가 없습니다.
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              하지만 곧 흥미진진한 이야기가 시작될 거예요. 기대해 주세요!
            </p>
          </div>
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
          </div>
        </div>
      </div>
    </>
  )
}
