'use client'

import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { LoginValidation } from '@/lib/validations/user'
import { QueryUser } from '@/lib/actions/user.actions'
import { uploadImage } from '@/lib/cloudinary'

const LoginPage = () => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    const { email, password } = values
    try {
      const user = await QueryUser({ email, password })
      console.log(user)
    } catch (error: any) {
      toast({
        description: error?.message ?? 'Register error.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className='container mx-auto w-2/4 rounded-sm p-6 bg-slate-50 text-slate-950'>
      <h4 className='text-slate-600'>LOGIN</h4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-10 flex flex-col justify-start gap-10'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter email'
                    {...field}
                    type='email'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-10 w-full'>
            SUBMIT
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginPage
