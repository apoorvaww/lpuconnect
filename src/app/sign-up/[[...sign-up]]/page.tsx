import { SignUp } from '@clerk/nextjs'

export default function Page(){
    return (
        <div className='min-h-screen flex items-center justify-center bg-background'>
            <div className='max-w-md w-full'>
                <SignUp/>
            </div>
        </div>
    )
}
