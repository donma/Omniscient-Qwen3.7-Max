$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$root = "d:\AI_PROJECTS\OmniscientQwen37Max"
$outDir = "$root\assets\img\previews"
$templates = Get-ChildItem "$root\templates" -Directory | Sort-Object Name

Write-Host "Retaking screenshots of $($templates.Count) templates..."
Write-Host ""

foreach ($t in $templates) {
    $idx = $t.FullName + "\index.html"
    $num = $t.Name -replace 'template-(\d+)-.*','$1'
    $outFile = "$outDir\template-$num.jpg"
    
    if (Test-Path $idx) {
        $fileUrl = "file:///$($idx -replace '\\','/')"
        Write-Host "[$num] $($t.Name)..."
        
        & $edge --headless --disable-gpu --disable-software-rasterizer `
            --screenshot="$outFile" `
            --window-size=1200,800 `
            --hide-scrollbars `
            --timeout=15000 `
            "$fileUrl" 2>$null
        
        Start-Sleep -Milliseconds 2000
        
        if (Test-Path $outFile) {
            $size = (Get-Item $outFile).Length
            Write-Host "  -> OK ($([math]::Round($size/1024))KB)" -ForegroundColor Green
        } else {
            Write-Host "  -> FAILED" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "Done!"
$files = Get-ChildItem "$outDir\template-*.jpg" -ErrorAction SilentlyContinue
Write-Host "Total: $($files.Count) screenshots"
