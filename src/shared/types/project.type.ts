export type ProjectType = {
    id: string
    name: string
    description: string
    image: string
    tech_stack: string[]
    features: string[]
    github_url: string | null
    private: boolean
    deployment_url: string | null
}