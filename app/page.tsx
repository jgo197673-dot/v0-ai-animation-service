"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Zap, Share2, Sparkles, ChevronDown, Loader2, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const WEBAPP_URL = "YOUR_URL_HERE"

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    idea: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showForm, setShowForm] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "닉네임을 입력해주세요"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "휴대폰 번호를 입력해주세요"
    } else if (!/^[0-9-+()]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "올바른 휴대폰 번호를 입력해주세요"
    }
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다"
    }
    if (!formData.idea.trim()) {
      newErrors.idea = "변환하고 싶은 유튜브 링크를 입력해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(WEBAPP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({ name: "", phone: "", email: "", idea: "" })
        setTimeout(() => {
          setShowForm(false)
          setIsSuccess(false)
        }, 3000)
      } else {
        alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.")
      }
    } catch (error) {
      alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#CCFF00] opacity-20 blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#CCFF00] opacity-20 blur-[120px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/10 px-6 py-2 text-sm font-semibold text-[#CCFF00] backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />곧 출시
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-balance text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
          >
            30분 영상,
            <br />
            <span className="bg-gradient-to-r from-[#CCFF00] via-[#00FF88] to-[#CCFF00] bg-clip-text text-transparent">
              30초 툰
            </span>
            으로 끝내기
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-16 max-w-3xl text-balance text-lg text-white/70 md:text-xl"
          >
            지루한 긴 영상은 이제 그만. AI가 핵심만 뽑아 밈 스타일 애니메이션으로 만들어드려요.
          </motion.p>

          {/* Demo animation placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mx-auto max-w-4xl"
          >
            <div className="group relative aspect-video overflow-hidden rounded-2xl border-2 border-[#CCFF00]/30 bg-gradient-to-br from-[#CCFF00]/10 to-transparent backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.1 }} className="relative cursor-pointer">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-[#CCFF00] blur-xl" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#CCFF00] bg-black">
                    <Play className="h-12 w-12 fill-[#CCFF00] text-[#CCFF00]" />
                  </div>
                </motion.div>
              </div>
              {/* Placeholder animation grid */}
              <div className="absolute inset-0 grid grid-cols-4 gap-2 p-8 opacity-20">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-lg bg-[#CCFF00]"
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-balance text-center text-4xl font-bold md:text-6xl"
          >
            지루함 <span className="text-white/40">vs</span> <span className="text-[#CCFF00]">재미</span>
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="mb-6 text-4xl">😴</div>
              <h3 className="mb-4 text-2xl font-bold text-white/60">원본 영상</h3>
              <ul className="space-y-3 text-white/50">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                  <span>30분 ~ 1시간 소요</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                  <span>집중력 떨어짐</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                  <span>중요한 부분 놓치기 쉬움</span>
                </li>
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border-2 border-[#CCFF00] bg-gradient-to-br from-[#CCFF00]/20 to-transparent p-8 backdrop-blur-sm"
            >
              <div className="mb-6 text-4xl">🔥</div>
              <h3 className="mb-4 text-2xl font-bold text-[#CCFF00]">생성된 애니메이션</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#CCFF00]" />
                  <span className="font-semibold text-white">30초 ~ 1분으로 압축</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#CCFF00]" />
                  <span className="font-semibold text-white">밈 스타일로 재미있게</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#CCFF00]" />
                  <span className="font-semibold text-white">핵심 내용만 쏙쏙</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-balance text-center text-4xl font-bold md:text-6xl"
          >
            이렇게{" "}
            <span className="bg-gradient-to-r from-[#CCFF00] to-[#00FF88] bg-clip-text text-transparent">
              간단합니다
            </span>
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-[#CCFF00]/30 bg-gradient-to-br from-[#CCFF00]/10 to-transparent p-8 backdrop-blur-sm transition-all hover:border-[#CCFF00]"
            >
              <Zap className="mb-6 h-12 w-12 text-[#CCFF00]" />
              <h3 className="mb-4 text-2xl font-bold">URL만 넣으면 끝</h3>
              <p className="leading-relaxed text-white/70">유튜브 링크만 복사해서 붙여넣으면 AI가 알아서 처리해요.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-[#CCFF00]/30 bg-gradient-to-br from-[#CCFF00]/10 to-transparent p-8 backdrop-blur-sm transition-all hover:border-[#CCFF00]"
            >
              <Sparkles className="mb-6 h-12 w-12 text-[#CCFF00]" />
              <h3 className="mb-4 text-2xl font-bold">밈 스타일 자동 적용</h3>
              <p className="leading-relaxed text-white/70">지루한 내용도 재미있는 밈과 애니메이션으로 변신해요.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-2xl border border-[#CCFF00]/30 bg-gradient-to-br from-[#CCFF00]/10 to-transparent p-8 backdrop-blur-sm transition-all hover:border-[#CCFF00]"
            >
              <Share2 className="mb-6 h-12 w-12 text-[#CCFF00]" />
              <h3 className="mb-4 text-2xl font-bold">1분 숏폼 자동 변환</h3>
              <p className="leading-relaxed text-white/70">인스타, 틱톡, 유튜브 쇼츠에 바로 올릴 수 있어요.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-balance text-center text-4xl font-bold md:text-6xl"
          >
            <span className="text-[#CCFF00]">지금 핫한</span> 영상의
            <br />
            애니메이션 요약
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-[#CCFF00]/30 bg-gradient-to-br from-[#CCFF00]/10 to-transparent backdrop-blur-sm transition-all hover:border-[#CCFF00] hover:scale-105"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-50">🎬</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="mb-2 h-2 w-3/4 rounded bg-white/30" />
                  <div className="h-2 w-1/2 rounded bg-white/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-balance text-center text-4xl font-bold md:text-6xl"
          >
            자주 묻는 질문
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                q: "무료인가요?",
                a: "정식 출시 후 기본 무료 플랜과 프리미엄 플랜을 제공할 예정이에요. 사전 예약자에게는 출시 초기 특별 혜택을 드립니다!",
              },
              {
                q: "어떤 영상이든 가능한가요?",
                a: "대부분의 유튜브 영상에서 작동해요. 강의, 리뷰, 브이로그, 다큐멘터리 등 다양한 콘텐츠를 지원합니다.",
              },
              {
                q: "생성 시간은 얼마나 걸리나요?",
                a: "영상 길이에 따라 다르지만, 보통 2-5분 정도면 애니메이션이 완성돼요.",
              },
              {
                q: "저작권 문제는 없나요?",
                a: "AI가 원본 콘텐츠를 새롭게 재구성하여 창작하기 때문에 안심하고 사용하실 수 있습니다.",
              },
              {
                q: "언제 출시되나요?",
                a: "2025년 상반기 출시 예정입니다. 사전 예약하시면 가장 먼저 소식을 받아보실 수 있어요!",
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#CCFF00]/30"
              >
                <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 leading-relaxed text-white/70">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
      >
        <Button
          onClick={() => setShowForm(true)}
          className="group relative overflow-hidden rounded-full border-2 border-[#CCFF00] bg-[#CCFF00] px-8 py-6 text-lg font-bold text-black shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-all hover:shadow-[0_0_50px_rgba(204,255,0,0.5)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            사전 예약하기
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </Button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => !isSubmitting && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg"
            >
              <Card className="border-2 border-[#CCFF00]/30 bg-black p-8">
                <Button
                  onClick={() => !isSubmitting && setShowForm(false)}
                  className="absolute right-4 top-4 h-8 w-8 rounded-full bg-white/10 p-0 hover:bg-white/20"
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>

                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="mb-6 text-6xl"
                    >
                      🎉
                    </motion.div>
                    <h3 className="mb-4 text-2xl font-bold text-[#CCFF00]">예약 성공!</h3>
                    <p className="text-lg text-white/70">런칭 알림을 기다려주세요.</p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="mb-6 text-center text-2xl font-bold">사전 예약하기</h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#CCFF00]">
                          닉네임 *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="홍길동"
                          className={`h-12 border-2 bg-white/5 ${
                            errors.name ? "border-red-500" : "border-white/20 focus:border-[#CCFF00]"
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#CCFF00]">
                          휴대폰 번호 *
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="010-1234-5678"
                          className={`h-12 border-2 bg-white/5 ${
                            errors.phone ? "border-red-500" : "border-white/20 focus:border-[#CCFF00]"
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#CCFF00]">
                          이메일 *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="example@email.com"
                          className={`h-12 border-2 bg-white/5 ${
                            errors.email ? "border-red-500" : "border-white/20 focus:border-[#CCFF00]"
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="idea" className="mb-2 block text-sm font-semibold text-[#CCFF00]">
                          변환하고 싶은 유튜브 링크 *
                        </label>
                        <Input
                          id="idea"
                          type="text"
                          value={formData.idea}
                          onChange={(e) => handleInputChange("idea", e.target.value)}
                          placeholder="https://youtube.com/watch?v=..."
                          className={`h-12 border-2 bg-white/5 ${
                            errors.idea ? "border-red-500" : "border-white/20 focus:border-[#CCFF00]"
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.idea && <p className="mt-1 text-sm text-red-400">{errors.idea}</p>}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 w-full bg-[#CCFF00] text-lg font-bold text-black transition-all hover:bg-[#CCFF00]/90 hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            AI가 그림 그릴 준비 중...
                          </>
                        ) : (
                          "사전 예약하기"
                        )}
                      </Button>

                      <p className="text-center text-xs text-white/50">* 모든 항목은 필수 입력 항목입니다</p>
                    </form>
                  </>
                )}
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-12 text-center">
        <p className="text-sm text-white/40">© 2025 AI 미니 애니메이션 요약 서비스. All rights reserved.</p>
      </footer>
    </div>
  )
}
