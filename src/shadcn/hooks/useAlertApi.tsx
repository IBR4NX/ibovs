"use client"

import { useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

type Method = "GET" | "POST" | "PUT" | "DELETE"

export function useAlertApi() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const [config, setConfig] = useState<{
    url: string
    method: Method
    body?: object
  } | null>(null)

  const alertApi = (
    url: string,
    method: Method = "GET",
    body?: object
  ) => {
    setConfig({ url, method, body })
    setError(null)
    setMessage(null)
    setOpen(true)
  }

  useEffect(() => {
    if (!open || !config) return

    const run = async () => {
      try {
        setLoading(true)

        const res = await fetch(config.url, {
          method: config.method,
          headers: { "Content-Type": "application/json" },
          body: config.body
            ? JSON.stringify(config.body)
            : undefined,
        })

        const data = await res.json()

        if (!res.ok)
          throw new Error(data?.message || "Request failed")

        setMessage(data?.message || "Success")
      } catch (err: any) {
        setError(err.message || "Unexpected error")
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [open, config])

  const AlertComponent = () => (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Processing</AlertDialogTitle>
          <AlertDialogDescription>
            {loading && "Loading..."}
            {error && <span className="text-red-500">{error}</span>}
            {message && <span className="text-green-600">{message}</span>}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {!loading && (
            <AlertDialogCancel>
              Close
            </AlertDialogCancel>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { alertApi, AlertComponent }
}