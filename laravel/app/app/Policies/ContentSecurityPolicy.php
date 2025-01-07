<?php

namespace App\Policies;

use Spatie\Csp\Policies\Policy;
use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;

class CustomCspPolicy extends Policy
{
    public function configure()
    {
        $this
            ->addDirective(Directive::DEFAULT_SRC, [Keyword::SELF])
            ->addDirective(Directive::SCRIPT_SRC, [Keyword::SELF, 'https://trusted-scripts.com'])
            ->addDirective(Directive::STYLE_SRC, [Keyword::SELF, Keyword::UNSAFE_INLINE])
            ->addDirective(Directive::IMG_SRC, [Keyword::SELF, 'https://trusted-images.com'])
            ->reportTo('https://your-csp-report-uri.com');
    }
}