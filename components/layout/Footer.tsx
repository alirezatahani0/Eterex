import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">اترکس</h3>
            <p className="text-sm text-muted-foreground">
              پلتفرم پیشرفته معاملات ارز دیجیتال با امنیت بالا و کارمزد پایین
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">لینک‌های مفید</h4>
            <ul className="space-y-2 space-y-reverse text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  درباره ما
                </Link>
              </li>
              <li> <Link href="/services" className="text-muted-foreground hover:text-foreground">
                  خدمات
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  تعرفه
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">قوانین</h4>
            <ul className="space-y-2 space-y-reverse text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  شرایط استفاده
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">تماس با ما</h4>
            <ul className="space-y-2 space-y-reverse text-sm">
              <li className="text-muted-foreground">پشتیبانی ۲۴/۷</li>
              <li className="text-muted-foreground">info@eterex.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} اترکس. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}

