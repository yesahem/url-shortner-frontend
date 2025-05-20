"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Copy, ExternalLink, LinkIcon, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { toast } from "sonner";

export default function Dashboard() {
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<
    { original: string; shortened: string; date: string }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef.current?.value) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 7);
      const newShortUrl = `chotu.link/${randomString}`;
      setShortUrl(newShortUrl);

      // Add to history
      setHistory([
        {
          original: inputRef.current?.value || "",
          shortened: newShortUrl,
          date: new Date().toLocaleDateString(),
        },
        ...history,
      ]);

      setIsLoading(false);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Link Copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chotu.Link
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Shorten Your URLs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
              Transform long, unwieldy links into clean, memorable and trackable
              short URLs.
            </p>
          </div>

          <Card className="border-2 border-indigo-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Create Short URL</CardTitle>
              <CardDescription>
                Enter a long URL to create a shortened version
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="url">Long URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="url"
                      placeholder="https://example.com/very/long/url/that/needs/shortening"
                      ref={inputRef}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-1">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          <span>Shortening...</span>
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => {
                            try {
                              new URL(inputRef.current?.value ?? " ");
                              console.log("Valid URL");
                            } catch (erro) {
                              console.log("invalid URL");
                            }
                            console.log(
                              "value from ref: ",
                              inputRef.current?.value
                            );
                          }}
                        >
                          <Sparkles className="h-4 w-4" />
                          <span>Shorten</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>

                {shortUrl && (
                  <div className="mt-6 rounded-lg bg-indigo-50 p-4 dark:bg-gray-800">
                    <Label
                      htmlFor="short-url"
                      className="text-sm font-medium text-indigo-900 dark:text-indigo-300"
                    >
                      Your shortened URL
                    </Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        id="short-url"
                        value={shortUrl}
                        readOnly
                        className="flex-1 bg-white dark:bg-gray-900"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(shortUrl)}
                        className="shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy to clipboard</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        onClick={() =>
                          window.open(`https://${shortUrl}`, "_blank")
                        }
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open link</span>
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {history.length > 0 && (
            <div className="mt-12">
              <Tabs defaultValue="recent" className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Your Links
                  </h3>
                  <TabsList>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="all">All Links</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="recent" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-200 dark:divide-gray-800">
                        {history.slice(0, 5).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4"
                          >
                            <div className="grid gap-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.shortened}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[300px]">
                                {item.original}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyToClipboard(item.shortened)}
                              >
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">
                                  Copy to clipboard
                                </span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  window.open(
                                    `https://${item.shortened}`,
                                    "_blank"
                                  )
                                }
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Open link</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="all" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-200 dark:divide-gray-800">
                        {history.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4"
                          >
                            <div className="grid gap-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.shortened}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {item.date}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[300px]">
                                {item.original}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyToClipboard(item.shortened)}
                              >
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">
                                  Copy to clipboard
                                </span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  window.open(
                                    `https://${item.shortened}`,
                                    "_blank"
                                  )
                                }
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Open link</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <div className="mt-16 rounded-xl bg-indigo-600 p-8 text-white shadow-lg dark:bg-indigo-900">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h3 className="text-2xl font-bold">
                  Ready to shorten more URLs?
                </h3>
                <p className="mt-2 text-indigo-100">
                  Chotu.Link helps you create short, memorable links in seconds.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Shorten Another URL
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Chotu.Link. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
