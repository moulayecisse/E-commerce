<?php
declare(strict_types=1);

namespace App\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model\Operation;
use ApiPlatform\Core\OpenApi\Model\PathItem;
use ApiPlatform\Core\OpenApi\Model\RequestBody;
use ApiPlatform\Core\OpenApi\OpenApi;
use ArrayObject;

class OpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(private OpenApiFactoryInterface $decorated)
    {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);
        foreach ($openApi->getPaths()->getPaths() as $key => $path) {
            if ($path->getGet() && $path->getGet()->getSummary() === 'hidden') {
                $openApi->getPaths()->addPath($key, $path->withGet(null));
            }
        }
        $schemas = $openApi->getComponents()->getSecuritySchemes();
        $schemas['cookieAuth'] = new ArrayObject(
            [
                'type' => 'apiKey',
                'in' => 'cookie',
                'name' => 'PHPSESSID'
            ]
        );
        $schemas = $openApi->getComponents()->getSchemas();
        $schemas['Credentials'] = new ArrayObject(
            [
                'type' => 'object',
                'properties' => [
                    'username' => [
                        'type' => 'string',
                        'example ' => 'john@doe.fr',
                    ],
                    'password' => [
                        'type' => 'string',
                        'example ' => '0000',
                    ]
                ]
            ]
        );

        $openApi
            ->getPaths()
            ->addPath(
                '/api/login', new PathItem(
                    post: new Operation(
                        operationId: 'postApiLogin',
                        tags: ['Auth'],
                        responses: [
                            '200' => [
                                'description' => 'Utilisateur connecté',
                                'content' => [
                                    'application/json' => [
                                        'schema' => [
                                            '$ref' => '#/components/schemas/User-read.User'
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        requestBody: new RequestBody(
                            content: new ArrayObject(
                                [
                                    'application/json' => [
                                        'schema' => [
                                            '$ref' => '#/components/schemas/Credentials'

                                        ]
                                    ]

                                ]
                            )
                        )
                    )
                )
            );

        return $openApi;
    }
}
// $openApi = $openApi->withSecurity(['cookieAuth' => []]);

//    $pathItem = $openApi->getPaths()->getPath('/api/grumpy_pizzas/{id}');
//    $operation = $pathItem->getGet();
//
//    $openApi->getPaths()->addPath('/api/grumpy_pizzas/{id}', $pathItem->withGet(
//        $operation->withParameters(array_merge(
//            $operation->getParameters(),
//            [new Model\Parameter('fields', 'query', 'Fields to remove of the output')]
//        ))
//    ));
//
//    $openApi = $openApi->withInfo((new Model\Info('New Title', 'v2', 'Description of my custom API'))->withExtensionProperty('info-key', 'Info value'));
//    $openApi = $openApi->withExtensionProperty('key', 'Custom x-key value');
//    $openApi = $openApi->withExtensionProperty('x-value', 'Custom x-value value');
//
//    return $openApi;
