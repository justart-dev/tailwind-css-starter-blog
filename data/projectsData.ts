interface Project {
  title: string
  description: string
  href?: string
}

const projectsData: Project[] = [
  {
    title: 'Clip Memo',
    description: `간단한 웹 기반 메모 도구로 단 한 번의 클릭으로 메모를 간편하게 공유할 수 있는 플랫폼. 
    
PWA 기술로 앱처럼 설치하여 사용할 수 있으며, 오프라인에서도 이용할 수 있다.

`,
    href: 'https://clip-memo.vercel.app',
  },
]

export default projectsData
