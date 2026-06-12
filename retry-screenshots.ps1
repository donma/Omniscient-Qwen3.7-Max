$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$root = "d:\AI_PROJECTS\OmniscientQwen37Max"
$outDir = "$root\assets\img\previews"

# Only retry T018 and T022
$targets = @(
    @{ num="018"; name="template-018-language-school" },
    @{ num="022"; name="template-022-bookstore" }
)

foreach ($t in $targets) {
    $idx = "$root\templates\$($t.name)\index.html"
    $outFile = "$outDir\template-$($t.num).jpg"
    
    if (Test-Path $idx) {
        $fileUrl = "file:///$($idx -replace '\\','/')"
        Write-Host "[$($t.num)] $($t.name)..."
        
        # Use --headless=new (new headless mode) with longer timeout
        & $edge --headless=new --disable-gpu --disable-software-rasterizer `
            --screenshot="$outFile" `
            --window-size=1200,800 `
            --hide-scrollbars `
            --timeout=15000 `
            --virtual-time-budget=10000 `
            "$fileUrl" 2>$null
        
        Start-Sleep -Milliseconds 3000
        
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
