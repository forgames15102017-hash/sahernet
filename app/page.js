import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function Home() {
  const { data: packages, error } = await supabase.from('packages').select('*')

  return (
    <main style={{ textAlign: 'center', padding: '40px', fontFamily: 'Tahoma, sans-serif' }}>
      <h1>شبكة ساهر نت (SaherNet)</h1>
      <p>شراء كروت الإنترنت الفورية بكل سهولة 🚀</p>
      
      <hr style={{ margin: '20px auto', width: '50%' }} />
      
      <h2>الباقات المتاحة:</h2>
      {error && <p style={{ color: 'red' }}>خطأ في جلب الباقات: {error.message}</p>}
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {packages && packages.length > 0 ? (
          packages.packages((pkg) => (
            <div key={pkg.id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '200px' }}>
              <h3>{pkg.name}</h3>
              <p>السعر: {pkg.price} شيكل</p>
              <button style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                شراء عبر جوال باي
              </button>
            </div>
          ))
        ) : (
          <p>جاري إعداد الباقات قريباً...</p>
        )}
      </div>
    </main>
  );
}
