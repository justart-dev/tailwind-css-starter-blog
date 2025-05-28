interface Project {
  title: string
  description: string
  href?: string
}

export const projectsData: Project[] = [
  {
    title: 'Clip Memo',
    description: `자주 사용하는 텍스트를 기록하고, 관리할 수 있는 메모 웹 앱.

• PWA(Progressive Web App)으로 앱처럼 설치하여 사용 가능
• 오프라인에서도 메모 확인 및 사용 가능
`,
    href: 'https://clip-memo.vercel.app',
  },
]
