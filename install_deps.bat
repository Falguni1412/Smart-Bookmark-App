@echo off
echo STARTING INSTALL >> install.log
where npm >> install.log
call npm install @supabase/supabase-js @supabase/ssr framer-motion lucide-react --legacy-peer-deps >> install.log 2>&1
echo INSTALL DONE >> install.log
dir node_modules\lucide-react >> install.log 2>&1
